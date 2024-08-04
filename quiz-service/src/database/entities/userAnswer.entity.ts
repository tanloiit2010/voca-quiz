import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionOption } from './questionOption.entity';
import { QuizSession } from './quizSession.entity';

@Entity({ name: 'user_answers' })
export class UserAnswer {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column({
    name: 'is_correct',
    type: 'boolean',
    nullable: true,
  })
  isCorrect?: boolean | null;

  @ManyToOne(() => Question, (question) => question.userAnswers)
  public question: Question;

  @ManyToOne(
    () => QuestionOption,
    (questionOption) => questionOption.userAnswers,
    {
      nullable: true,
    },
  )
  public questionOption?: QuestionOption | null;

  @ManyToOne(() => QuizSession, (quizSession) => quizSession.userAnswers)
  public quizSession: QuizSession;

  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;
}
