import mongoose from 'mongoose';
const url ='mongodb+srv://mauPineyro:mongoClusterMP1Nomehable1@clustermp1.yuubkwb.mongodb.net/CoderBackendEcommerceDB'
export async function connectToDatabase(){
    try {
        await mongoose.connect(url);
        console.log('Conexión a db exitosa');
    } 
    catch (err) {
        console.log(err);
        throw 'no se ha podido conectar a mongo';
    }
    }


