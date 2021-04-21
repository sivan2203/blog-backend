import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../../model/admin.entity';
import * as bcrypt from 'bcrypt';

export class CreateFirstAdmin1618989345357 implements MigrationInterface {
  private AdminRepository: any;
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);
    if (!await adminRepository.findOne({ 'where': { login: 'admin' } })) {
      const admin: Admin = adminRepository.create({
        login: 'admin',
        passwordHash: await bcrypt.hash('secret', 10),
        nickName: 'GromMax',
      });
      await adminRepository.insert(admin);
    } else {
      return;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);
      const admin: Admin = await adminRepository.findOne({ 'where': { login: 'admin'}});
      if (!admin) {
          return;
      }

      await this.AdminRepository.remove(admin);
  }
}
