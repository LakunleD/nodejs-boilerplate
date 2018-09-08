const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
let mongodbteststring = 'mongodb://127.0.0.1:27017/my_test_db';

mongoose
    .connect(
        mongodbteststring,
        {useNewUrlParser: true}
    )
    .then(() => {
        console.log('Test MongoDB Connected');
    })
    .catch(err => {
        console.log(err);
        throw err;
    });

const User = require('../models/user');

describe('User model test', () => {
    beforeAll(async () => {
        await User.remove({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('has a module', () => {
        expect(User).toBeDefined();
    });

    describe('save user', async () => {
        let salt = bcrypt.genSaltSync(11);
        let password = bcrypt.hashSync("password", salt);

        const user = new User({
            firstname: "firstname test",
            lastname: "lastname test",
            email: "test@test.com",
            password,
            phonenumber: 123456789
        });

        await user.save();
    });

    describe('get user', () => {
        it('gets a user', async () => {
            let firstname = "firstname test";
            let lastname = "lastname test";
            let email = "test@test.com";
            let phonenumber = 123456789;

            const user = await User.findOne({firstname}).select("-password, -__v, -createdAt");
            expect(user.firstname).toEqual(firstname);
            expect(user.lastname).toEqual(lastname);
            expect(user.email).toEqual(email);
            expect(user.phonenumber).toEqual(phonenumber);
        });
    });

    describe('update user', () => {
        it('update the firstname property of a user', async () => {
            let firstname = 'new firstname test';
            let lastname = "lastname test";
            let email = "test@test.com";
            let phonenumber = 123456789;

            const user = await User.findOneAndUpdate({lastname}, {firstname}, {new: true});
            expect(user.firstname).toEqual(firstname);
            expect(user.lastname).toEqual(lastname);
            expect(user.email).toEqual(email);
            expect(user.phonenumber).toEqual(phonenumber);
        });
    });

    describe('delete user', () => {
        it('delete a user', async () => {
            let firstname = 'new firstname test';
            let lastname = "lastname test";
            let email = "test@test.com";
            let phonenumber = 123456789;
            const user = await User.findOneAndRemove({firstname});
            expect(user.firstname).toEqual(firstname);
            expect(user.lastname).toEqual(lastname);
            expect(user.email).toEqual(email);
            expect(user.phonenumber).toEqual(phonenumber);
        });

        it('empty user database', async () => {
            const users = await User.find({});
            // expect(users).toBeUndefined();
        });
    });

});