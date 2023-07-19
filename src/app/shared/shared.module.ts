import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageModule } from "./message/message.module";


@NgModule({
  imports: [CommonModule, MessageModule],
  exports: [MessageModule],
})
export class SharedModule {}
