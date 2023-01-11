const db = require("../models/index");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { sequelize } = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const addUsers = asyncHandler(async (req, res, next) => {
  const { teamUsers } = req.body;
  const time = new Date().getTime();

  console.log(req.body);

  try {
    for (let i of teamUsers) {
      const user = await db.team_user.findOne({
        where: { email: i.email },
      });

      console.log(user);

      if (user) {
        res.statusCode = 400;
        res.json({ message: `Email already exist: ${i.email}` });
        return;
      }

      await db.team_user.create({
        id: i.id,
        fullName: i.name || i.fullName,
        email: i.email,
        password: i.password,
        organization: i.organization,
        team: i.team,
        role: i.role,
        profilePicture: i.profilePicture,
        visibility: true,
        isVerified: i.isVerified,
        time: time,
      });
    }
    res.statusCode = 200;
    res.json({ message: "Users added successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const teamAdminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  await db.team_user
    .findOne({ where: { email } })
    .then(async (user) => {
      if (user === null) {
        throw new Error("User not found");
      }

      if (!user.isVerified) {
        throw new Error("User is not verified");
      }

      await bcrypt
        .compare(password, user.dataValues.password)
        .then((macth) => {
          if (macth) {
            res.statusCode = 200;
            const token = jwt.sign({ id: user.id }, process.env.ACCESS_SECRET, {
              expiresIn: 3600,
            });
            res.json({ user, token: token });
          } else {
            throw new Error("Password do not match");
          }
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { id, data } = req.body;
  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      const newData = {
        fullName: data.fullName || user.fullName,
        email: data.email || user.email,
        organization: data.organization || user.organization,
        team: data.team || user.team,
        role: data.role || user.role,
        profilePicture: data.profilePicture || user.profilePicture,
        visibility: data.visibility || user.visibility,
      };

      await db.team_user
        .update(newData, { where: { id } })
        .then(() => {
          res.statusCode = 200;
          res.json("user updated successfully");
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const updateTeamAdminPassword = asyncHandler(async (req, res, next) => {
  const { id, password } = req.body;

  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      if (!user.isVerified) {
        throw new Error(
          "You cannot change password since user is not verified"
        );
      }

      const salt = await bcrypt.genSalt(10).catch((error) => next(error));
      const hashPassword = await bcrypt
        .hash(password, salt)
        .catch((error) => next(error));

      const newData = {
        password: hashPassword,
      };

      await db.team_user
        .update(newData, { where: { id } })
        .then(() => {
          res.statusCode = 200;
          res.json("Password updated successfully");
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const validateTeamAdmin = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  await db.team_user
    .findByPk(id)
    .then(async (user) => {
      if (user === null || !user) {
        throw new Error("User not found");
      }

      if (user.role === "Team Admin") {
        const newData = {
          isVerified: true,
        };

        await db.team_user
          .update(newData, { where: { id } })
          .then(() => {
            res.statusCode = 200;
            res.json(user);
          })
          .catch((error) => next(error));
      } else {
        throw new Error("Team Member are not allowed");
      }
    })
    .catch((error) => next(error));
});

const getUserDetailById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await db.team_user
    .findByPk(id)
    .then((user) => {
      if (user === null || !user) {
        throw new Error("User not found");
      } else {
        res.statusCode = 200;
        res.json(user);
      }
    })
    .catch((error) => next(error));
});

const getAllUserOfOrganization = asyncHandler(async (req, res, next) => {
  const { organization } = req.params;
  console.log(organization);
  await db.team_user
    .findAll({ where: { organization, visibility: true } })
    .then((teamUsers) => {
      console.log(teamUsers);
      res.statusCode = 200;
      res.json(teamUsers);
    })
    .catch((error) => next(error));
});

const getAllUserByTeam = asyncHandler(async (req, res, next) => {
  const { organization } = req.params;

  await db.team_user
    .findAll({ where: { organization, visibility: true } })
    .then(async (users) => {
      const data = users.reduce((result, currentItem) => {
        (result[currentItem["team"]] = result[currentItem["team"]] || []).push(
          currentItem
        );
        return result;
      }, {});

      res.statusCode = 200;
      res.json(data);
    })
    .catch((error) => next(error));
});

const getUserByTeamAndOrganization = asyncHandler(async (req, res, next) => {
  const { organization, team } = req.params;

  await db.team_user
    .findAll({
      where: { team, organization, visibility: true },
    })
    .then((data) => {
      res.statusCode = 200;
      res.json(data);
    })
    .catch((error) => next(error));
});

const getTeamUserProductivity = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    const resultData = await db.tracker_data.findAll({
      attributes: [
        "type",
        [sequelize.fn("sum", sequelize.col("duration")), "value"],
      ],
      where: {
        userid: id,
      },
      group: ["type"],
    });

    let temp;
    const arr = [];

    resultData.map((item) => {
      if (item.type === "Unproductive") {
        temp = {
          value: parseInt(item.dataValues.value),
          description: item.dataValues.type,
          color: "red",
        };
        arr.push(temp);
      } else if (item.type === "Productive") {
        temp = {
          value: parseInt(item.dataValues.value),
          description: item.dataValues.type,
          color: "green",
        };
        arr.push(temp);
      } else {
        temp = {
          value: parseInt(item.dataValues.value),
          description: item.dataValues.type,
          color: "orange",
        };
        arr.push(temp);
      }
    });

    res.statusCode = 200;
    res.json(arr);
  } catch (error) {
    next(error);
  }
});

const getTeamUserScreenshots = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  await db.tracker_data
    .findAll({
      attributes: ["imgName", "owner", "duration"],
      where: {
        userid: id,
      },
    })
    .then((response) => {
      const result = [];

      response.map((x) => {
        if (x.dataValues.imgName.length !== 0) {
          result.push(x.dataValues);
        }
      });

      res.statusCode = 200;
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

const getUsersCount = asyncHandler(async (req, res, next) => {
  try {
    const { organization } = req.params;

    const allUsers = await db.team_user.count({
      where: {
        organization: organization,
        visibility: true,
      },
    });

    const active = await db.tracker_data.count({
      attributes: ["userid"],
      where: {
        organization,
        visibility: true,
        [Op.and]: [sequelize.literal(`time > now() - (1*INTERVAL '5 min')`)],
      },
      group: ["userid"],
    });

    const allTrackerUser = await db.tracker_data.findAll({
      attributes: ["userid"],
      where: {
        organization,
        visibility: true,
      },
      group: ["userid"],
    });

    const inactive = allTrackerUser.length - active.length;

    res.statusCode = 200;
    res.json({ allUsers, active: active.length, inactive });
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

const deleteTeamUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await db.team_user
    .update({ visibility: false }, { where: { id } })
    .then(() => res.status(200).send("Successfully Deleted"))
    .catch((error) => next(error));
});

const resetUserId = asyncHandler(async (req, res) => {
  const { currentId, newId } = req.body;
  console.log(currentId);
  console.log(newId);

  try {
    const user = await db.application_ids.findOne({
      where: { userId: currentId },
    });

    if (!user) {
      res.status(404).json({ message: "No user found" });
      return;
    }

    await db.application_ids.update(
      { userId: newId },
      { where: { userId: currentId } }
    );

    res.status(200).json({ message: "User Id updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  addUsers,
  teamAdminLogin,
  updateUser,
  updateTeamAdminPassword,
  validateTeamAdmin,
  getUserDetailById,
  getAllUserOfOrganization,
  getAllUserByTeam,
  getUserByTeamAndOrganization,
  getTeamUserProductivity,
  getTeamUserScreenshots,
  getUsersCount,
  deleteTeamUser,
  resetUserId,
};
