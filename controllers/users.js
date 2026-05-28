const getAllUsers = async (requestAnimationFrame, res) => {
    try {
        const users = await UserActivation.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}