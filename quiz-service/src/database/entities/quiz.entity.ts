import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Question } from './question.entity';
import { QuizSession } from './quizSession.entity';

@Entity({ name: 'quizzes' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate?: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate?: Date;

  @OneToMany(() => Question, (question) => question.quiz, {
    cascade: ['insert', 'update'],
  })
  public questions?: Question[];

  @OneToMany(() => QuizSession, (quizSession) => quizSession.quiz)
  public quizSessions: QuizSession[];
}
