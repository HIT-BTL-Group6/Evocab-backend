const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const Exam = require('../models/exam.model');
const { examService } = require('../services');

// const getExams = catchAsync(async (req, res) => {
//     const options = pick(req.query, ['sortBy', 'limit', 'page']);

//     const page = parseInt(options.page) || 1;
//     const limit = parseInt(options.limit) || 10;
//     const skip = (page - 1) * limit;
//     const exams = await Exam.find().limit(limit).skip(skip).populate('questions');
    
//     res.status(httpStatus.OK).json({
//         code: httpStatus.OK,
//         message: 'Get exams successfully!',
//         data: exams,
//     });
// });
const getExams = catchAsync(async (req, res) => {
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const { topicId } = req.query;

    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    const exams = await Exam.find().limit(limit).skip(skip).populate('questions');
    if(!exams){
        throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
    }
    let filteredExams = exams;

    if (topicId) {
        filteredExams = exams.filter(exam => {
            const topics = new Set(exam.questions.map(question => question.topic.toString()));
            return topics.size === 1 && topics.has(topicId);
        });
        if (!filteredExams) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found!');
        } 
    }
    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exams successfully!',
        data: filteredExams,
    });
});

const getExam = catchAsync(async (req, res) => {
    const examId = req.params.examId;

    const exam = await examService.getExamById(examId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Get exam successfully!',
        data: exam,
    });
});

const createExam = catchAsync(async (req, res) => {
    const examData = req.body;
    const newExam = await examService.createExam(examData);

    res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: 'Create exam successfully!',
        data: newExam,
    });
});

const updateExam = catchAsync(async (req, res) => {
    const { examId } = req.params;
    const examBody = req.body;

    const exam = await examService.updateExamById(examId, examBody);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Update exam successfully!',
        data: exam,
    });
});

const deleteExam = catchAsync(async (req, res) => {
    const { examId } = req.params;
    const deletedExam = await examService.deleteExamById(examId);

    res.status(httpStatus.OK).json({
        code: httpStatus.OK,
        message: 'Delete exam successfully!',
        data: deletedExam,
    });
});

module.exports = {
    getExam,
    getExams,
    createExam,
    updateExam,
    deleteExam,
};
