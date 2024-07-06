import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        validate: {
            validator: (value) => {
                const  re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        trim: true,
        validate: {
            validator: (value) => {
                return value.length >= 6;
            },
            message: "Password must be greater then 6 character long."
        }
    },
    photo: {
        type: String,
        default: 'https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png',
    },
    bio: {
        type: String,
        required: false,
        default: "I am a new user."
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'creator'],
        default: 'user'
    },
    isVerified: {
        type: Boolean, 
        default: false,
    }
}, {
    timestamps: true,
});


const User = mongoose.model('User', UserSchema);

export default User;