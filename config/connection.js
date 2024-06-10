import { connect, connection } from 'mongoose';

connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api');

export default connection;