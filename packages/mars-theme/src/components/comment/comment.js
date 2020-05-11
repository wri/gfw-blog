import React from 'react';
import { styled } from "frontity";

export default function Comment() {
  return (
    <Container>
      <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
        <Author>Jane Doe</Author>
        <ReplyButon
          type="submit"
          value="REPLY"
        />
      </div>
      <CreationDate>October 11, 2019 at 12:00pm CET</CreationDate>
      <Content>
        I love the blog redesign! Butcher sustainable direct trade kickstarter. Paleo sustainable single-origin coffee kogi art party. Master cleanse farm-to-table four loko, taiyaki selvage banh mi forage YOLO church-key chia shaman VHS hoodie. Pok pok fashion axe trust fund street art sartorial bushwick letterpress iceland mixtape literally portland VHS williamsburg. Authentic truffaut banjo, tilde literally biodiesel hammock fanny pack humblebrag succulents ethical shoreditch waistcoat man braid portland. XOXO next level thundercats, synth brooklyn kinfolk everyday carry iPhone banh mi keffiyeh truffaut deep v post-ironic. Yr banjo narwhal air plant hell of beard coloring book austin shabby chic jianbing vape paleo biodiesel blue bottle semiotics.
      </Content>
    </Container>
  );
}

const Container = styled.div`
  width: auto;
`;

const Author = styled.p`
  color: #333333;
  font-size: 16px;
  font-weight: bold;
`;

const ReplyButon = styled.input`
  width: 100px;
  height: 20px;
  border: 1px solid #97BD3D;
  border-radius: 80px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  line-height: 14px;
`;

const CreationDate = styled.p`
  font-size: 12px;
  color: #5555555;
  margin-top: 10px;
`;

const Content = styled.p`
  margin-left: 95px;
  font-size: 16px;
  line-height: 28px;
  color: #5555555;
  margin-top: 15px;
`;
