const Room = require("../models/room");
const uniqid = require("uniqid");

exports.getRoom = async (req, res) => {
    const roomId = req.params.id; // room ID is passed as a parameter
    const isRead = roomId[roomId.length - 1] == "r";
    console.log(isRead);
    try {
        const room = isRead
            ? await Room.findOne({ readKey: roomId }, { writeKey: 0 })
            : await Room.findOne({ writeKey: roomId });

        if (!room) {
            return res.status(404).json({ message: "Key Is Invalid" });
        }

        return res.json(room);
    } catch (error) {
        console.error("Error retrieving room:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.createRoom = async (req, res) => {
    // const { value, language } = req.body;

    try {
        const room = new Room({
            readKey: uniqid() + "-r",
            writeKey: uniqid() + "-w",
            // value,
            // language,
        });

        const savedRoom = await room.save();

        return res.status(201).json(savedRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.updateRoom = async (req, res) => {
    const roomId = req.params.id;
    const { value, language } = req.body;

    try {
        const room = await Room.findOneAndUpdate(
            { writeKey: roomId },
            { language: language, value: value }
        );

        if (!room) {
            return res.status(404).json({ message: "Key Is Invalid." });
        }

        // room.value = value;
        // const updatedRoom = await room.save();

        return res.json(room);
    } catch (error) {
        console.error("Error updating room:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
