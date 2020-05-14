import { styled } from 'frontity';

import { LARGE_ENDPOINT, MEDIUM_ENDPOINT } from '../heplers/css-endpoints';

// Comments list
export const CommentsListContainer = styled.div`
  width: 770px;
  height: auto;
  margin: 0 auto 7.5rem auto;
  @media screen and (max-width: ${LARGE_ENDPOINT}) {
    display: none;
  }
  @media screen and (max-width: ${MEDIUM_ENDPOINT}) {
    display: none;
  }
`;

export const CommentsListTitle = styled.h4`
  font-size: 18px;
  color: #333333;
  margin-bottom: 35px;
`;

// Comment
export const CommentContainer = styled.div`
  width: auto;
  margin-bottom: 3rem;
`;

export const CommentAuthor = styled.p`
  color: #333333;
  font-size: 16px;
  font-weight: bold;
`;

export const CommentCreationDate = styled.p`
  font-size: 12px;
  color: #555;
  margin-top: 10px;
`;

export const CommentContent = styled.p`
  margin: 1rem 0 0 4.6rem;
  font-size: 16px;
  line-height: 28px;
  color: #555;
  align: left;
`;

export const ReplyButon = styled.input`
  width: 100px;
  height: 20px;
  border: 1px solid #97bd3d;
  border-radius: 80px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  line-height: 14px;
`;

// AddCommentForm
export const Divider = styled.hr`
  width: auto;
  position: relative;
  top: ${props => props.isCommentInserted === true ? 140 : 0}px;
  height: 1px;
  background-color: #e5e5df;
  margin: 3.7rem 0 3.5rem 0;
  border: none;
`;

export const AddCommentFormNewCommentWrapper = styled.div`
  display: ${(props) => props.success === true ? 'block' : 'none'};
  position: relative;
  bottom: 4.5rem;
`;

export const AddCommentContainer = styled.div`
  width: 640px;
  display: ${(props) => (props.isVisible === 'true' ? 'block' : 'none')};
`;

export const AddCommentTitle = styled.h3`
  font-weight: bold;
  font-size: 18px;
`;

export const AddCommentSubtitle = styled.p`
  color: #555555;
  font-size: 14px;
`;

export const AddCommentF0rm = styled.form`
  margin: 45px 0px 0px 10px;
  width: 640px;
`;

export const AddCommentFieldArea = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-top: 25px;
  ${(props) => props.style}
`;

export const AddCommentTextarea = styled.textarea`
  border: 1px solid #dededd;
  width: 540px;
  height: 200px;
  padding: 10px;
  margin-right: 1%;
`;

export const AddCommentInputLabel = styled.label`
  font-weight: bold;
  font-size: 12px;
  margin-top: 10px;
  color: #333333;
  ${(props) => props.style}
`;

export const AddCommentInput = styled.input`
  border: 1px solid #dededd;
  width: 540px;
  ${(props) => props.style}
`;

export const AddCommentCheckboxIcon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const AddCommentCheckbox = styled.div`
  border: ${(props) => (props.checked ? 'none' : '1px solid #E5E5DF;')};
  display: inline-block;
  width: 25px;
  height: 25px;
  background: ${(props) => (props.checked ? '#97BD3D' : '#ffffff')};
  border-radius: 3px;
  transition: all 150ms;
  margin-left: 5.77rem;
  cursor: pointer;
  ${AddCommentCheckboxIcon} {
    cursor: pointer;
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

export const AddCommentCheckboxDescr = styled.p`
  margin-right: 32%;
  font-size: 14px;
  color: #555;
  a {
    font-size: 14px;
    color: '#97BD3D';
    text-decoration: none;
  }
`;

export const AddCommentResponse = styled.p`
  display: ${(props) => (props.isError ? 'block' : 'none')};
  font-size: 14px;
  font-weight: bold;
  width: auto;
  color: #d85656;
  max-width: 70%;
  margin-left: 1rem;
`;

export const AddCommentSubmitButton = styled.input`
  border-radius: 22.5px;
  border: 1px solid #97bd3d;
  background-color: #ffffff;
  color: #333333;
  width: 160px;
  font-weight: 500;
  margin-left: auto;
  cursor: pointer;
`;
