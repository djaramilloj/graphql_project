'use strict'

const connectDb = require('./db')
const { ObjectId } = require('mongodb')
const errorH = require('./errorHandler')

module.exports = {
    createCourse: async (root, {input}) => {
        let db
        let course
        const defaults = {
            teacher: '',
            topic: ''
        }
        const newCourse = Object.assign(defaults, input)
        try {
            db = await connectDb(process.env.MONGO_URI)
            course = await db.collection('courses').insertOne(newCourse)
        } catch(error) {
            errorH.errorHandler(error)
        }
        newCourse._id = course.insertedId
        return newCourse
    },
    createPerson: async (root, {input}) => {
        let db
        let student
        const newStudent = Object.assign(input)
        try {
            db = await connectDb(process.env.MONGO_URI)
            student = await db.collection('students').insertOne(newStudent)
        } catch(error) {
            errorH.errorHandler(error)
        }
        newStudent._id = student.insertedId
        return newStudent
    },
    editPerson: async (root, {input, id}) => {
        let db
        let student
        try {
            db = await connectDb(process.env.MONGO_URI)
            await db.collection('students').updateOne(
                {_id: ObjectId(id)},
                {$set: input}
            )
            student = await db.collection('students').findOne(
                {_id: ObjectId(id)}
            )
        } catch(error) {
            errorH.errorHandler(error)
        }
        return student
    },
    editCourse: async (root, {input, id}) => {
        let db = await connectDb(process.env.MONGO_URI)
        await db.collection('courses').updateOne(
            {_id: ObjectId(id)},
            {$set: input}
        )
        let course = await db.collection('courses').findOne(
            {_id: ObjectId(id)}
        )
        return course
    },
    deleteCourse: async (root, {id}) => {
        let db = await connectDb(process.env.MONGO_URI)
        await db.collection('courses').deleteOne({_id: ObjectId(id)})
        return 'course with id: ' + id + 'has been deleted'
    },
    deleteStudent: async (root, {id}) => {
        let db = await connectDb(process.env.MONGO_URI)
        await db.collection('students').deleteOne({_id: ObjectId(id)})
        return 'student with id: ' + id + 'has been deleted'
    },
    addPeople: async (root, {courseId, personId}) => {
        let db = await connectDb(process.env.MONGO_URI)
        let course = await db.collection('courses').findOne({_id: ObjectId(courseId)})
        let person = await db.collection('students').findOne({_id: ObjectId(personId)})

        if (!course || !person) {
            throw new Error('Either person or course doesnt exist')
        }
        await db.collection('courses').updateOne(
            {_id: ObjectId(courseId)},
            {$addToSet: {people: ObjectId(personId)}} 
        )
        return course
    }
}