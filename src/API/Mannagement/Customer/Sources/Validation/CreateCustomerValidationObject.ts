import { IsEmail, IsNotEmpty } from 'class-validator';
import { CustomerDTO } from 'src/APP/Mannagement/Customer/Application/CustomerDTO';

export class CreateCustomerValidationObject extends CustomerDTO{

    @IsNotEmpty()
    name: String;

    @IsEmail()
    contact: String;

    
}