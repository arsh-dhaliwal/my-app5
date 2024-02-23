const db = require('../db/init_db');
const CompanyModel = require('../models/companyModel');

const getCompanyProfile = async (req, res) => {
    try {
        const companyProfile = await CompanyModel.findOne();
        res.status(200).json(companyProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving company profile', error });
    }
};

const createCompanyProfile = async (req, res) => {
    try {
        const newCompanyProfile = await CompanyModel.create(req.body);
        res.status(201).json(newCompanyProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error creating company profile', error });
    }
};

const updateCompanyProfile = async (req, res) => {
    try {
        const updatedCompanyProfile = await CompanyModel.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedCompanyProfile) {
            res.status(200).json({ message: 'Company profile updated successfully' });
        } else {
            res.status(404).json({ message: 'Company profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating company profile', error });
    }
};

const deleteCompanyProfile = async (req, res) => {
    try {
        const deletedCompanyProfile = await CompanyModel.destroy({
            where: { id: req.params.id }
        });
        if (deletedCompanyProfile) {
            res.status(200).json({ message: 'Company profile deleted successfully' });
        } else {
            res.status(404).json({ message: 'Company profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting company profile', error });
    }
};

module.exports = {
    getCompanyProfile,
    createCompanyProfile,
    updateCompanyProfile,
    deleteCompanyProfile
};