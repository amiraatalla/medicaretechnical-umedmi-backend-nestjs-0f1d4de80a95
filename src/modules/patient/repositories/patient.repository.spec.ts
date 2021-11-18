import { PatientRepository } from './patient.repository';

describe('PatientRepository', () => {
  it('should be defined', () => {
    expect(new PatientRepository()).toBeDefined();
  });
});
