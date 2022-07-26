fs.readFile("./allUserData.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk:", err);
      return res.send({ msg: "Please try after some time" }); ;
    }
    try {
        //   console.log(users);
          const filteredUsers = users.filter(user => {
                if (user.name.includes(reqName)) return user;
          })
           console.log(filteredUsers);
          return  res.send( filteredUsers );

    } catch (err) {
          console.log("Error parsing JSON string:", err);
          return res.send({ msg: "Please try after some time" });
    }
});