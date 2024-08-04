import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { QuestionOption } from './questionOption.entity';
import { UserAnswer } from './userAnswer.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content: string;

  @Column()
  type: string;

  @Column()
  score: number;

  @Column({ name: 'display_order' })
  displayOrder: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  public quiz: Quiz;

  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    {
      cascade: ['insert', 'update'],
    },
  )
  public questionOptions: QuestionOption[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.question)
  public userAnswers: UserAnswer[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;
}
