import mongoose from 'mongoose';
const url ='mongodb+srv://mauPineyro:mongoClusterMP1Nomehable1@clustermp1.yuubkwb.mongodb.net/CoderBackendEcommerceDB'
export async function connectToDatabase(){
    try {
        await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log('db connected');
    } 
    catch (err) {
        console.log(err);
        throw 'connection failed';
    }
    }


