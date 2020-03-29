
import { ValidationError } from 'class-validator'
import { Res } from '@nestjs/common';
export class WebController {

  protected responseWithValidationErrors(route: string, errors: ValidationError[], @Res() response) {
  
    errors = this.formatErrors(errors);
    return response.status(301).send({errors})
  
  }

  protected redirectWithMessage(route: string, @Res() response, message: string){

      return response.status(200).send({message})

  }

  private formatErrors(validationErrors: ValidationError[]): any[] {

    return validationErrors.map(validationError => {

      const constrainstNames = Object.keys(validationError.constraints).map(constraintName => constraintName)
      const constraintValue = validationError.constraints[constrainstNames[0]];

      const value = validationError.value ? validationError.value : 'empty'

      return {
        value,
        message: `on ${validationError.property} validationError: ${constraintValue}`
      }
    });

  }

}
