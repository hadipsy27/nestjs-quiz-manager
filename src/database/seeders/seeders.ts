import { User } from '../../modules/user/user.entity';
import { connectionSource } from '../../config/typeorm.config';
import { UserRoles } from '../../modules/user/enum/user.enum';

connectionSource
  .initialize()
  .then(async (connection) => {
    const userRepository = connection.getRepository(User);

    // Jalankan query SQL langsung
    const users = await userRepository.query('SELECT * FROM users');
    console.info(users);

    // Tambahkan data seeding jika perlu
    const user = new User();
    user.name = 'Jojhn Doel';
    user.email = 'jojhn.doel@example.com';
    user.password = 'Password@123';
    user.role = UserRoles.ADMIN;
    user.createAt = new Date(Date.now());
    user.updatedAt = new Date(Date.now());
    await userRepository.save(user);

    console.log('User has been saved');

    await connection.destroy();
  })
  .catch((error) => console.log(error));

// npm run seeder:run
