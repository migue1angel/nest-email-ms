export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    title: string;
    content: string;
    attachments?: Attachment[];
  }
  
export interface Attachment {
    filename: string; 
    path: string;
  }
  