import { mongoose } from 'mongoose';

const { connect, connection } = mongoose;

connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api');

export default connection;