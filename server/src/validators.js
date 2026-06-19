import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required()
});

export const userSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().empty('').min(8).optional(),
  role: Joi.string().valid('SUPER_ADMIN', 'ADMIN', 'REGISTRAR_USER', 'FINANCE_USER', 'STUDENT').required(),
  status: Joi.string().valid('ACTIVE', 'INACTIVE').default('ACTIVE'),
  permissions: Joi.array().items(Joi.string()).default([])
});

export const requestSchema = Joi.object({
  studentName: Joi.string().min(2).required(),
  studentId: Joi.string().min(2).required(),
  motherName: Joi.string().min(2).required(),
  placeOfBirth: Joi.string().min(2).required(),
  dateOfBirth: Joi.date().required(),
  mobile1: Joi.string().pattern(/^[+()\-\s0-9]{7,20}$/).required(),
  mobile2: Joi.string().allow('', null).pattern(/^[+()\-\s0-9]{7,20}$/).optional(),
  email: Joi.string().email().required(),
  secondarySchool: Joi.string().required(),
  graduationYear: Joi.number().integer().min(1950).max(2100).required(),
  faculty: Joi.string().required(),
  department: Joi.string().required(),
  academicYear: Joi.string().required(),
  modeOfStudy: Joi.string().required(),
  notes: Joi.string().allow('', null).optional()
});

export const statusSchema = Joi.object({
  status: Joi.string().valid('PENDING', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'COMPLETED').required()
});
