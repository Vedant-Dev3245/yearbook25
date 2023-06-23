const { User, Search } = require("../models/user");


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
            const name = writer.name;
            const receiver = await User.findById(targetId).session(session);
            const captions = receiver.captions;
            //checking if a caption has already been written or not, then we'll update otherwise push a new one
            if (captions.find((o) => o.name === name)) {
                for (let i = 0; i < captions.length; i++) {
                    if (captions[i].name === name) {
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
                                        name: name,
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
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                bitsId: req.body.bitsId,
                quote: req.body.quote,
                branchCode: req.body.branchCode,
                imageUrl: req.body.imgUrl,
                phone: req.body.phone,
                pEmail: req.body.pEmail,
            });

            const new_vote = { user: req.user.id, count: 0, hasVoted: false };

            const poll_add = await Poll.find({ $in: req.body.branchCode }).then((results) => {
                results.map((poll) => {
                    poll.vote.push(new_vote);
                    poll.save();
                })
            });
            await user.save();

            const userId = user.id;
            const withoutQuotes = userId.toString().replace(/"/g, ""); //removing """ from objectId thus generated
            console.log(userId);
            const search = new Search({
                uId: withoutQuotes,
                name: user.name,
                bitsId: user.bitsId,
            });
            await search.save();
            const token = jwt.sign({ user: user.id, bitsId: user.bitsId, email: user.email }, process.env.TOKEN_KEY, { expiresIn: "30d" });
            return res.send({
                detail: "Profile created",
                _id: userId,
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
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).send();
        }
        return res.send({
            user: {
                'name': user.name,
                'imageUrl': user.imageUrl,
                'bitsId': user.bitsId,
                'discipline': user.discipline,
                'quote': user.quote,
                'captions': user.captions,
                'nominatedby': user.nominatedby
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
