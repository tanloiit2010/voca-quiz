import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { UserAnswer } from './userAnswer.entity';

@Entity({ name: 'question_options' })
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  content: string;

  @Column({ name: 'is_correct', select: false })
  isCorrect: boolean;

  @Column({ name: 'display_order' })
  displayOrder: number;

  @ManyToOne(() => Question, (question) => question.questionOptions)
  public question: Question;

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.questionOption)
  public userAnswers?: UserAnswer[];

  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;
}
