const mongoose = require("mongoose");

const fieldforms = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Types.ObjectId,
            required:[true , 'user is required'],
            ref:'User'
        },
        projectId:{     
            type:String,
            required:true ,
        },
        currentTab:{           
            type:Number,
            required:false,
            default:0
        },
        scopeFromReceivedDocuments:{
            type:String,
            required:false,
            maxLength:2000,
        },
        scopeFromInterview:{
            type:String,
            required:false,
            maxLength:2000,
        },
        
        sowStatement: {
            standardScope:{
                type:String,
                required:false,
            },
            expertsCraft:{
                type:String,
                required:false,
            },
        },
        propertyStructure: [{
            buildingType:{
                type:String,
                required:false,
                maxLength:255,
            },
            numberOfStories:{
                type:String,
                required:false,
                maxLength:255,
            },
            storyBySubLoc:{
                type:String,
                required:false,
                maxLength:255,
            },
            constructionType:{
                type:String,
                required:false,
                maxLength:255,
            },
            foundationType:{
                type:String,
                required:false,
                maxLength:255,
            },
        }],
        propertyAppraiserRecord: {
                type:String,
                required:false,
                maxLength:255,
            
        },
        permitInformation: {
                type:String,
                required:false,
                maxLength:255,
            
        },
        topographicMap: {
                type:String,
                required:false,
                maxLength:255,
            
        },
        
        interviewee: [{
            contactMethod:{
                type:String,
                required:false,
                maxLength:255,
            },
            mrOrms:{
                type:String,
                required:false,
                maxLength:255,
            },
            firstName:{
                type:String,
                required:false,
                maxLength:255,
            },
            lastName:{
                type:String,
                required:false,
                maxLength:255,
            },
            owner:{
                type:String,
                required:false,
                maxLength:255,
            },
            company:{
                type:String,
                required:false,
                maxLength:255,
            },
            intervieweeProvidedAccess:{
                type:String,
                required:false,
                maxLength:255,
            },
            businessCardFront:{type:String,
                    required:false, 
            },
                        businessCardBack:{type:String,
                                required:false, 
            },
                        document:{
                            type:String,
                                required:false, 
            },
        }],
        propertyPurchesTime:{
            type:String,
            required:false,
            maxLength:255,
        },
        dolPerInterviewee:{
            type:String,
            required:false,
            maxLength:255,
        },
        interviewRecord:{
            type:String,
            required:false,
            maxLength:255,
        },
        interviewStructure: [{
            structureBuilt:{
                type:String,
                required:false,
                maxLength:255,
            },
            roofLastReplaceTime:{
                type:String,
                required:false,
                maxLength:255,
            },
            interiorDamageInfo:{
                type:String,
                required:false,
                maxLength:255,
            },
            exterior:{
                exteriorDamageInfo:{
                    type:String,
                    required:false,
                    maxLength:255,
                },
                notes:{
                    type:String,
                    required:false,
                    maxLength:255,
                },
            },
            roof:{
                roofDamageInfo:{
                    type:String,
                    required:false,
                    maxLength:255,
                },
                notes:{
                    type:String,
                    required:false,
                    maxLength:255,
                },
            },
            roomArea:[{
                roomNumber:{
                    type:String,
                    required:false,
                    maxLength:255,
                },
                damage:[{
                    damageNumber:{
                        type:String,
                        maxLength:255,
                    },
                    damageLocation:{
                        type:String,
                        maxLength:255,
                    },
                    atticInfo:{
                        type:String,
                        maxLength:255,
                    },
                    notes:{
                        type:String,
                        maxLength:255,
                    },
                    
                }],
            }],
        }],

        interiorDamageSketch:{ 
                type:String,
                maxLength:500,
                required:false,
            
        },
        roofSketch:{
                type:String,
                maxLength:5000,
                required:false,
            
        },
        docOverView:[{
            constructionEstimate:{ 
                type:String,
                required:false,
                maxLength:5000,
            },
            documentReviewNotes:{ 
                type:String,
                required:false,
                maxLength:5000,
            },
            noteworthyItems:{ 
                type:String,
                required:false,
                maxLength:5000,
            }
        }],
        weatherData:{
            windData:{
                  type:String,
                  required: false,
                  maxLength:5000,
            },
            hailData:{
                  type:String,
                  required: false,
                  maxLength:5000,
            },
            tornadoData:{
                  type:String,
                  required: false,
                  maxLength:5000,
            },
            additionalData:{
                    type:String,
                    required: false,
                    maxLength:5000,
              },
       },
       lightningStrikeData:{
               type:String,
               required: false,
               maxLength:5000,
        },
        floodData:[{
            gangaData:{ 
                type:String,
                required:false,
                maxLength:5000,
            },
            waterMarkData:{ 
                type:String,
                required:false,
                maxLength:5000,
            },
            gageData:{ 
                type:String,
                required:false,
                maxLength:5000,
            },
            distanceData:{ 
                type:String,
                required:false,
                maxLength:5000,
            }
        }],
            aerialImageNotes:{
                type:String,
                required:false,
                maxLength:5000,
    
            },  
            realtorImageNotes:{
                type:String,
                required:false,
                maxLength:5000,
    
            },
            googleOrBingImageNotes:{
                type:String,
                required:false,
                maxLength:5000,
    
            },
            zillowImageNotes:{
                type:String,
                required:false,
                maxLength:5000,
    
            },
      
            redfinImageNotes:{
                type:String,
                required:false,
                maxLength:5000,
    
            },
        soilData:{
            type:String,
            required:false,
            maxLength:5000,

        },
    }
);
module.exports = mongoose.model("FieldForm", fieldforms);