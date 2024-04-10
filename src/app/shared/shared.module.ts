import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MessageModule } from "./message/message.module";
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [CommonModule, MessageModule, MatCardModule],
  exports: [MessageModule],
  declarations: [],
})
export class SharedModule {}
