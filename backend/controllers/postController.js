const { createPostServ } = require("../services/authService");

const createPost = async (req, res) => {
    try {
        const { userId, make, model, year, price, description, images } = req.body;
        console.log("req.body", req.body);
        if (!make || !model || !year || !price || !description || !images) {
            return res.status(400).json({
                success: false,
                message: 'Make, model, year, price, description, and images are required.'
            });
        }
        const newPost = await createPostServ({
            userId,
            make,
            model,
            year,
            price,
            description,
            images
        })

        res.status(201).json({
            success: true,
            message: 'Post created successfully!',
            post: newPost,
        });

    } catch (error) {
        console.error('Error Posting post:', error);
        res.status(500).json({
            success: false,
            message: 'Error Posting post.',
            error: error.message,
        });
    }
}
module.exports = {
    createPost
};

