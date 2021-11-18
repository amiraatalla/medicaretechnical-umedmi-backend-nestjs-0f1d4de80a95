import { BaseHttpResponse } from '../classes/base-http.response';
import { Speciality } from 'src/modules/speciality/models/speciality';
import { LocalizedField } from '../models/localizedfield';

export class SpecialityResponse extends BaseHttpResponse<Speciality> {
  data: Speciality;

  constructor(speciality: Speciality) {
    super();
    this.data = speciality;
  }
}

export class SpecialityArrayResponse extends BaseHttpResponse<Array<Speciality>> {
  data: Array<Speciality>;

  constructor(experienceSpeciality: Array<Speciality>) {
    super();
    this.data = experienceSpeciality;
  }
}

export class SubSpecialityArrayResponse extends BaseHttpResponse<Array<LocalizedField>> {
  data: Array<LocalizedField>;

  constructor(experienceSpeciality: Array<LocalizedField>) {
    super();
    this.data = experienceSpeciality;
  }
}
