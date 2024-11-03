 
const Profile = require('../models/profile');

const createProfile = async (req, res) => {
    try{
        const {name, email, phone, address} = req.body;

        if(!name || !email || !phone || !address){
            return res.status(400).json({
                success: false,
                message: 'Please provide all required data for profile creation'
            });
        }

        let profile = await Profile.findOne({email:email});

        if(profile){
            return res.status(400).json({
                success: false,
                message: 'Profile already exists with this email'
            });
        }

        profile = await Profile.create({name, email, phone, address});

        res.status(200).json({
            success: true,
            message: 'Profile created successfully',
            data: profile
        });



    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
            message: 'failed to create profile'

        });
    }
}


const getProfile = async (req,res)=>{
    try{
        let profile = await Profile.find({});

        if(!profile){
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }
        

        res.status(200).json({
            success: true,
            message: 'Profile data retrieved successfully',
            data: profile
        });
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'failed to get profile data',
            error: error.message
        })
    }
}


const updataProfile = async (req,res) =>{
    try{
        const {profileId} = req.params;
        const {name, email, phone, address} = req.body;

        if(!profileId ){
            return res.status(400).json({
                success: false,
                message: 'Profile ID is required'
            });
        }

        let profile = await Profile.findByIdAndUpdate(profileId, {name, email, phone, address}, {new: true});

        if(!profile){
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }


        res.status(200).json({
            success: true,
            message: 'Profile data updated successfully',
            data: profile
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'failed to update profile data',
            error: error.message
        })
    }
}


const deleteProfile = async (req,res) =>{
    try{
        const {profileId} = req.params;

        if(!profileId){
            return res.status(400).json({
                success: false,
                message: 'Profile ID is required for deleting profile'
            });
        }
        
        let profile = await Profile.findByIdAndDelete(profileId)

        res.status(200).json({
            success: true,
            message: 'Profile data deleted successfully',
            data: profile

        });


    }catch(error){
        res.status(500).json({
            success: false,
            message: 'failed to delete profile data',
            error: error.message
        })
    }
}

module.exports = {createProfile, getProfile, updataProfile, deleteProfile};