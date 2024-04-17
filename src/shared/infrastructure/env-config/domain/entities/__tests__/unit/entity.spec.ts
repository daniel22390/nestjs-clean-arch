import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string,
  prop2: number,

}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {


  it('Should set props and id', () => {
    const props = {prop1: 'value1', prop2: 234}
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity.id).not.toBeNull()
    expect(uuidValidate(entity.id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = {prop1: 'value1', prop2: 234}
    const id = '45c27b94-0497-4261-8bbf-c3840bd2296b'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity.id)).toBeTruthy()
    expect(entity.id).toEqual(id)
  })

  it('Should convert a entity to a JS Object', () => {
    const props = {prop1: 'value1', prop2: 234}
    const id = '45c27b94-0497-4261-8bbf-c3840bd2296b'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props
    })
  })
})
