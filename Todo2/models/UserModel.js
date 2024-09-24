const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    }        
    next();    
});

UserSchema.methods.comparePassword = async function (password) {
    if(!password) throw new Error('Password is missing, cannot compare');

    try {
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('Error while comparing password', error.message)
    }
}

// UserSchema.statics.isThisEmailInUse = async function(email) {
//     if (!email){
//         throw new Error('Invalid email')
//     }
//     try {
//         const user = await this.findOne({email})
//         if (user) {
//             return false 
//         }
//         return true;
//     } catch (error) {
//         console.log('Error: Email in use', error.message)
//         return false
//     }
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;