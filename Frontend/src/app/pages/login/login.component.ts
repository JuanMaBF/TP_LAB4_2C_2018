import { Component } from "@angular/core";
import { UsersService } from "src/app/services/users.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: []
}) export class LoginComponent {
    
    constructor(private usersService: UsersService) {
    }

}