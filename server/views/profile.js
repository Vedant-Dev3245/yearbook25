const { User, Search } = require("../models/user");
const Poll = require("../models/poll");
const jwt = require("jsonwebtoken")


const editProfile = async (req, res) => {
    try {
        const session = await User.startSession();
        session.startTransaction();

        const user = await User.findById(req.user.id);

        const imgUrl = req.body.imgUrl;
        if (imgUrl != "") {
            user.imageUrl = imgUrl;
        }

        const quote = req.body.quote;
        if (quote != "") {
            user.quote = quote;
        }

        await user.save();
        await session.commitTransaction();
        session.endSession();

        return res.send({
            msg: "Successfully Updated",
        });
    } catch (err) {
        return res.status(400).send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
};

const writeCaption = async (req, res) => {
    try {
        const caption = req.body.caption;
        const writerId = req.user.id;
        const targetId = req.params.id;
        // console.log(caption, writerId, receiverId);

        const session = await User.startSession();
        session.startTransaction();

        // const receiver = await User.findById(receiverId).session(session)
        // let temp = []
        // console.log(receiver.nominatedby)
        // receiver.nominatedby.forEach(x => temp.push(x.id))
        // console.log(temp)
        // console.log(writerId)
        // if (!temp.includes(writerId)) {
        //     session.endSession();
        //     return res.status(403).send({
        //         error: "You're not nominated to write the caption!"
        //     })
        // }

        const writer = await User.findById(writerId).session(session);

        let temp = [];
        writer.nominatedby.forEach((x) => temp.push(x.id));
        if (!temp.includes(targetId)) {
            session.endSession();
            return res.status(403).send({
                error: "You're not nominated to write the caption!",
            });
        }

        if (caption === "") {
            session.endSession();
            return res.send({
                error: "Please enter a valid caption!",
            });
        } else {
            const writer = await User.findById(writerId).session(session);
            const receiver = await User.findById(targetId).session(session);
            const captions = receiver.captions;
            //checking if a caption has already been written or not, then we'll update otherwise push a new one
            if (captions.find((o) => o.user === writer)) {
                for (let i = 0; i < captions.length; i++) {
                    if (captions[i].user === writer) {
                        captions[i].caption = caption;
                    }
                }
                await receiver.updateOne({ captions: captions }).session(session);
                await session.commitTransaction();
                session.endSession();
                return res.send({ success: "Succesfully Updated" });
            } else {
                await receiver
                    .updateOne({
                        $push: {
                            captions: {
                                $each: [
                                    {
                                        user: writer,
                                        caption: caption,
                                    },
                                ],
                            },
                        },
                    })
                    .session(session);
                await session.commitTransaction();
                session.endSession();
                return res.send({
                    success: "Succesfully Added",
                });
            }
        }
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
};

const addProfile = async (req, res) => {
    try {
        let usr = await User.findOne({
            email: req.body.email,
        });

        User.deleteOne({ email: req.body.email });
        usr = await User.findOne({
            email: req.body.email,
        });
        if (usr) {
            return res.send({
                msg: "User Exists Already",
            });
        } else {
            const bitsId = req.body.id
            let branchCode = bitsId.substring(4, bitsId.length - 4)

            if (branchCode.includes("B")) {
                branchCode = [branchCode.substring(0, 2), branchCode.substring(2, 4)]
            } else if (branchCode[0] = "A") {
                branchCode = [branchCode.substring(0, 2)]
            } else {
                branchCode = [branchCode]
            }

            const user = await User.create({
                name: `${req.body.firstName} ${req.body.lastName}`,
                email: req.body.email,
                bitsId,
                personalEmail: req.body.pEmail,
                phone: req.body.phone,
                quote: req.body.quote,
                branchCode,
                imageUrl: req.body.imgUrl,
            });

            const new_vote = { user: user, count: 0, hasVoted: false };

            await Poll.find({ branch: { $in: branchCode } }).then((results) => {
                results.map((poll) => {
                    poll.votes.push(new_vote);
                    poll.save();
                })
            });

            const userId = user.id;
            const withoutQuotes = userId.toString().replace(/"/g, ""); //removing """ from objectId thus generated
            console.log(userId);
            const search = new Search({
                uId: withoutQuotes,
                name: user.name,    
                bitsId: user.bitsId,
            });
            await search.save();
            const token = jwt.sign({ id: user.id, bitsId, email: user.email, branchCode }, process.env.TOKEN_KEY, { expiresIn: "30d" });
            return res.send({
                detail: "Profile created",
                id: userId,
                token: token,
            });
        }
    } catch (err) {
        console.log(err);
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        });
    }
};

const searchUsers = async (req, res) => {
    try {
        let result = await Search.aggregate([
            {
                $search: {
                    index: 'search',
                    autocomplete: { //autocomplete is implemented so that suggestions are sent to front
                        query: `${req.query.name}`,
                        path: "name"
                    }
                },
            },
            {
                $limit: 12,
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        // use this for local deployment
        // let result = await Search.find({
        //     $text: {
        //         $search: `${req.query.name}`,
        //     }
        // })
        res.send({ users: result });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }

}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({ path: 'captions', populate: [{
                path: 'user'
            }]
        }).populate({
            path: 'requests',
            populate: [{
                path: 'user'
            }]
        }).populate({
            path: 'declined_requests',
            populate: [{
                path: 'user'
            }]
        });

        if (!user) {
            return res.status(400).send();
        }

        let captions = [];
        user.captions.forEach(element => {
            captions.push({
                name: element.user.name,
                caption: element.caption,
                imageUrl: element.user.imageUrl
            })
        });
        
        return res.send({
            user: {
                'name': user.name,
                'imageUrl': user.imageUrl,
                'bitsId': user.bitsId,
                'discipline': user.discipline,
                'quote': user.quote,
                'captions': captions,
                'nominatedby': user.nominatedby,
                'requests': user.requests,
                'declined_requests': user.declined_requests
            }
        })
    } catch (err) {
        return res.send({
            status: "failure",
            msg: "There was an error, Please try after some time",
        })
    }
}

module.exports = {
    editProfile,
    writeCaption,
    addProfile,
    searchUsers,
    getProfile,
};
