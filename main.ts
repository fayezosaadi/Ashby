enum FieldTypes {
  TEXT,
  EMAIL,
  Checkbox,
  DROPDOWN,
  FILE
}

const defaultQuestionType = FieldTypes.TEXT

/**
 *
 * Model Region - Server Side - Owner
 */

interface IForm {
  addQuestion(question: Question): void

  dropQuestion(question: Question): void

  getQuestions(): Question[]

  setTitle(title: string): void

  getTitle(): string

  setDescription(description: string): void

  getDescription(): string

  send(email: string[]): void
}

interface IQuestion {
  drop(): void

  setContent(value: string): void

  setType(type: FieldTypes): void

  setIsRequired(value: boolean): void

  setIsVisible(value: boolean): void

  setCheckboxOption(value: string): void

  blocks(question: Question): void

  setCondition(condition: string): void

  addDropDownOption(value: string): void

  getContent(): string

  getType(): FieldTypes

  getIsRequired(): boolean

  getIsVisible(): boolean

  getCheckboxOption(): string | null

  getDropdownOption(): string[] | null

  getBlockedQuestion(): Question | null

  getConditionToUnblock(): string | null

}

interface ICheckboxOption {
  setContent(value: string): void

  getContent(): string
}

interface IDropdownOptionList {
  add(value: string): void

  getList(): string[]

  drop(option: string): void
}

class Form implements IForm {

  private questions: Question[]
  private title: string
  private description: string

  constructor(
    title: string = 'Untitled form',
    description: string = '',
    question: Question[] = [],
  ) {
    this.questions = question
    this.title = title
    this.description = description
  }

  /**
   *
   * Currently can only insert to the tail of the list
   * Todo: This can be improved by adding ability to insert at any position
   */
  public addQuestion(question: Question): void {
    // const question: Question = new Question()
    this.questions = [...this.questions, question]
  }

  /**
   *
   * drops a question from the list
   */
  public dropQuestion(question: Question): void {
    question.drop()
    this.questions = this.questions.filter(q => q !== question)
  }

  public getQuestions(): Question[] {
    return this.questions
  }

  public setTitle(title: string): void {
    this.title = title
  }

  public getTitle(): string {
    return this.title
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public getDescription(): string {
    return this.description
  }

  /**
   *
   * Todo:
   * 1. Get the url of the created from
   * 2. Send out email invitations with the form URL
   *
   * @param email
   */
  public send(email: string[]): void {
  }
}

class Question implements IQuestion {

  private isVisible: boolean
  private isRequired: boolean
  private content: string
  private fieldType: FieldTypes
  private checkBoxOption: CheckBoxOption | null
  private selectDropDownOptionList: SelectDropDownOptionList | null
  private conditionToUnblock: string | null
  private blockedQuestion: Question | null = null

  constructor(
    fieldType: FieldTypes = defaultQuestionType,
    content: string = 'Untitled Question',
    isVisible: boolean = true,
    isRequired: boolean = false,
    checkBoxOption: CheckBoxOption = null,
    selectDropDownOptionList: SelectDropDownOptionList = null,
    conditionToUnblock: string = null,
    blockedQuestion: Question = null,
  ) {
    this.fieldType = fieldType
    this.content = content
    this.isVisible = isVisible
    this.isRequired = isRequired
    this.checkBoxOption = checkBoxOption
    this.selectDropDownOptionList = selectDropDownOptionList
    this.conditionToUnblock = conditionToUnblock
    this.blockedQuestion = blockedQuestion
  }

  public addDropDownOption(value: string): void {
    this.selectDropDownOptionList.add(value)
  }

  public setCheckboxOption(value: string): void {
    this.checkBoxOption.setContent(value)
  }

  public setIsVisible(value: boolean) {
    this.isVisible = value
  }

  public setContent(value: string) {
    this.content = value
  }

  public setIsRequired(value: boolean) {
    this.isRequired = value
  }

  public setType(type: FieldTypes) {
    this.fieldType = type

    if (this.fieldType === FieldTypes.Checkbox) {
      this.checkBoxOption = new CheckBoxOption()
    } else if (this.fieldType === FieldTypes.DROPDOWN) {
      this.selectDropDownOptionList = new SelectDropDownOptionList()

    } else {
      this.checkBoxOption = null
      this.selectDropDownOptionList = null
    }
  }

  public blocks(question: Question): void {
    this.blockedQuestion = question
  }

  public setCondition(condition: string): void {
    this.conditionToUnblock = condition
  }

  public getIsVisible(): boolean {
    return this.isVisible
  }

  public getContent(): string {
    return this.content
  }

  public getIsRequired(): boolean {
    return this.isRequired
  }

  public getType(): FieldTypes {
    return this.fieldType
  }

  public getCheckboxOption(): string | null {
    return this.checkBoxOption.getContent()
  }

  public getDropdownOption(): string[] | null {
    return this.selectDropDownOptionList.getList()
  }

  public getBlockedQuestion(): Question | null {
    return this.blockedQuestion
  }

  public getConditionToUnblock(): string | null {
    return this.conditionToUnblock
  }

  /**
   *
   * drops Question and any related objects
   */
  public drop(): void {
  }
}

class CheckBoxOption implements ICheckboxOption {
  private content: string

  constructor(content = 'checkbox option') {
    this.content = content
  }

  public getContent(): string {
    return this.content
  }

  public setContent(value: string) {
    this.content = value
  }

}

class SelectDropDownOptionList implements IDropdownOptionList {
  private list: string[]

  constructor(list: string[] = ['options 1']) {
    this.list = list
  }

  /**
   *
   * Currently can only insert to the tail of the list
   * Todo: This can be improved by adding ability to insert at any position
   */
  public add(value: string) {
    this.list = [...this.list, value]
  }

  public getList(): string[] {
    return this.list
  }

  public drop(item: string): void {
    this.list = this.list.filter(option => option != item)
  }

}

/**
 *
 * Model Region - Server Side - End User
 */

interface ISubmission {

  getForm(): Form

  addAnswer(answer: string, question: Question): void

  submit(): void

}

interface IAnswer {
  submit(): void
}

class Submission implements ISubmission {

  private form: Form
  private answers: Answer[]

  constructor(form: Form, answers: Answer[] = []) {
    this.form = form
    this.answers = answers
  }

  public getForm(): Form {
    return this.form
  }

  public addAnswer(userAnswer: string, question: Question): void {
    const answer = new Answer(userAnswer, question)

    this.answers = [...this.answers, answer]
  }

  /**
   *
   * Form submission logic
   */
  public submit(): void {
    console.info('Form submission is in progress...')

    // Todo: check required fields
  }

}

class Answer implements IAnswer {
  private readonly answer: string
  private readonly question: Question

  constructor(answer: string, question: Question) {
    this.answer = answer
    this.question = question

    // Check if the question is blocking another question
    if (this.question.getBlockedQuestion()) {
      if (this.answer === this.question.getConditionToUnblock()) {
        this.question.getBlockedQuestion().setIsVisible(true)
      }
    }
  }

  /**
   *
   * Todo: Make api call to save answers
   */
  public submit() {
    console.info(`Save Answer ${this.answer} for Question ${this.question}`)
  }
}

/**
 *
 * View-controller regions - Client side - End User
 */

interface IField {

  setValue(value: string): void

  getValue(): string

}

abstract class Field implements IField {
  private value: string = ''

  constructor() {
    // this.type = type
  }

  public setValue(value: string): void {
    this.value = value
  }

  public getValue(): string {
    return this.value
  }
}

/**
 *
 * ShortText specific logic
 */
class ShortText extends Field {
}

/**
 *
 * Email specific logic
 */
class Email extends Field {

  public setValue(value: string): void {
    // Add logic to validate email address
    super.setValue(value)
  }
}

/**
 *
 * Checkbox specific logic
 */
class Checkbox extends Field {
}

/**
 *
 * SelectDropDown specific logic
 */
class SelectDropDown extends Field {
}

/**
 *
 * FileUpload specific logic
 */
class FileUpload extends Field {

  /**
   *
   * Todo: upload file to the cloud
   * Todo: get file url
   */
  public uploadFile(): void {
    super.setValue('uploaded-file-url')
  }
}
