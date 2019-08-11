import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb+srv://sttreaks2:easypass' +
          '@cluster0-liq5j.mongodb.net/test?retryWrites=true&w=majority'),
  },
];
