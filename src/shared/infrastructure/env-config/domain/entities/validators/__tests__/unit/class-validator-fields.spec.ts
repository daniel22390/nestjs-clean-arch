import { ClassValidatorFields } from "../../class-validator-fields";
import * as libClassValidator from 'class-validator'

type Fields = {
  fields: string
}

class StubClassValidatorFields extends ClassValidatorFields<Fields>{}

describe("ClassValidatorFields unit tests", () => {
  it("Should initializa erros and validatedData variables with null", () => {
    const sut = new StubClassValidatorFields()

    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it("Should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([
      {property: 'field', constraints: { isRequired: 'test error' }}
    ])
    const sut = new StubClassValidatorFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({field: ['test error']})
  })

  it("Should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])
    const sut = new StubClassValidatorFields()

    expect(sut.validate({field: 'value'})).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({field: 'value'})
    expect(sut.errors).toBeNull()
  })
})
