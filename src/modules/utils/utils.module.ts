import { Module } from '@nestjs/common';
import { UploaderModule } from './uploader/uploader.module';
import { StaticModule } from './static/static.module';
import { ImageModule } from './image/image.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UploaderModule, StaticModule, ImageModule, FirebaseModule, NotificationModule],
})
export class UtilsModule {}
