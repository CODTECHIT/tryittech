import mongoose, { Schema, model, models } from 'mongoose';

const TrainingSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    longDescription: { type: String },
    icon: { type: String },
    image: { type: String },
    modules: { type: [String], default: [] },
}, { timestamps: true });

export const Training = models.Training || model('Training', TrainingSchema);

const ServiceSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    icon: { type: String },
    image: { type: String },
    secondaryImage: { type: String },
    shortDescription: { type: String },
    fullDescription: { type: String },
    benefits: { type: [String], default: [] },
    process: { type: [String], default: [] },
}, { timestamps: true });

export const Service = models.Service || model('Service', ServiceSchema);

const IndustrySchema = new Schema({
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    secondaryImage: { type: String },
    icon: { type: String },
    info: { type: String },
    overview: { type: String },
    segments: { type: Schema.Types.Mixed, default: [] },
    solutions: { type: Schema.Types.Mixed, default: [] },
    insights: { type: Schema.Types.Mixed, default: [] },
    edge: { type: Schema.Types.Mixed, default: [] },
}, { timestamps: true });

export const Industry = models.Industry || model('Industry', IndustrySchema);

const InquirySchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    message: { type: String },
    service: { type: String },
    source: { type: String, default: 'Website' },
}, { timestamps: true });

export const Inquiry = models.Inquiry || model('Inquiry', InquirySchema);

const TrainerSchema = new Schema({
    name: { type: String, required: true },
    mobile: { type: String },
    email: { type: String },
    expertise: { type: String },
    details: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const Trainer = models.Trainer || model('Trainer', TrainerSchema);

const LicenseSchema = new Schema({
    name: { type: String, required: true },
    license_number: { type: String },
    start_date: { type: String },
    end_date: { type: String },
    status: { type: String, default: 'Active' },
}, { timestamps: true });

export const License = models.License || model('License', LicenseSchema);

// Re-export mongoose for convenience
export default mongoose;
