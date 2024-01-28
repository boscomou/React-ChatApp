import React from 'react'
import "./ChatTab.css"

function Down() {
  return (
    <div class="chat-box">
  <div class="header">
    <div class="avatar-wrapper avatar-big">
      <img src="https://znews-photo.zadn.vn/w660/Uploaded/pnbcuhbatgunb/2020_03_23/i13863960814_1.jpg" alt="avatar" />
    </div>
    <span class="name">Crush</span>
    <span class="options">
      <i class="fas fa-ellipsis-h"></i>
    </span>
  </div>
  <div class="chat-room">
    <div class="message message-left">
      <div class="avatar-wrapper avatar-small">
        <img src="https://znews-photo.zadn.vn/w660/Uploaded/pnbcuhbatgunb/2020_03_23/i13863960814_1.jpg" alt="avatar" />
      </div>
      <div class="bubble bubble-light">
        Hey anhat!
      </div>
    </div>
    <div class="message message-right">
      <div class="avatar-wrapper avatar-small">
        <img src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/s960x960/87853049_2481558942096235_8369025410146500608_o.jpg?_nc_cat=110&_nc_sid=09cbfe&_nc_ohc=0dU4W6nYBk0AX-ZHz-P&_nc_ht=scontent-xsp1-1.xx&_nc_tp=7&oh=20d12357dd09465c5ed2526555651580&oe=5EA2FF44" alt="avatar" />
      </div>
      <div class="bubble bubble-dark">
        what is going on?
      </div>
    </div>
  </div>
  <div class="type-area">
    <div class="input-wrapper">
      <input type="text" id="inputText" placeholder="Type messages here..." />
    </div>
    <span class="button-add">
      <i class="fas fa-plus-circle"></i>
      <div class="others">
        <span class="emoji-button">
          <i class="far fa-laugh"></i>
          <div class="emoji-box">
            <span>&#x1f604;</span>
            <span>😀</span>
            <span>😂</span>
            <span>😭</span>
            <span>😍</span>
            <span>🤮</span>
            <span>🤑</span>
            <span>😖</span>
            <span>😷</span>
          </div>
        </span>
        <span class="image-button">
          <i class="far fa-image"></i>
        </span>
        <span>
          <i class="fas fa-paperclip"></i>
        </span>
      </div>
    </span>
    <button class="button-send">Send</button>
  </div>

</div>
  )
}

export default Down
