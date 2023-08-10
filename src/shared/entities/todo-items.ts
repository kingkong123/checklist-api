import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ToDoItems {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  itemName: string

  @Column({
    type: 'boolean',
    default: false
  })
  completed: boolean
}
