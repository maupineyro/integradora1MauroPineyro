import mongoose from 'mongoose';

const connectToDatabase = async () =>{
    const url ='mongodb+srv://mauPineyro:mongoClusterMP1Nomehable1@clustermp1.yuubkwb.mongodb.net/CoderBackendEcommerceDB'
    try {
        await mongoose.connect(url,{
            useUnifiedTopology: true, 
            useNewUrlParser: true 
        });
        console.log('Conexión a db exitosa');
    } 
    catch (err) {
        return console.log(err);
    }
    }

export default connectToDatabase;
