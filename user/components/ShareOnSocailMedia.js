import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "next-share";
import styles from "../css/shareOnSocial.module.css";
const ShareOnSocailMedia = ({ link }) => {
  return (
    <div className={styles.shareSocialDiv}>
      <div>
        <WhatsappShareButton url={link} separator=":: ">
          <button>
            <WhatsappIcon size={32} round />
            Share on Whatsapp
          </button>
        </WhatsappShareButton>
      </div>
      <div>
        <TwitterShareButton url={link}>
          <button>
            <TwitterIcon size={32} round />
            Share on Twitter
          </button>
        </TwitterShareButton>
      </div>
      <div>
        <EmailShareButton url={link} body="body">
          <button>
            <EmailIcon size={32} round />
            Share on Email
          </button>
        </EmailShareButton>
      </div>
      <div>
        <LinkedinShareButton url={link}>
          <button>
            <LinkedinIcon size={32} round />
            Share on Linkedin
          </button>
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default ShareOnSocailMedia;
