import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./service/auth/auth.module";
import { MessageModule } from "./shared/message/message.module";
import { SigninComponent } from "./pages/signin/signin.component";
import { AppComponent } from "./app.component";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-center',
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
