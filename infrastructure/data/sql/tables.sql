CREATE TABLE IF NOT EXISTS bht.lp_msg (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
userid BIGINT,
title VARCHAR(140) NOT NULL,
regist_time TIMESTAMP DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET utf8;

CREATE TABLE IF NOT EXISTS bht.mock_msg (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
userid BIGINT,
title VARCHAR(140) NOT NULL,
regist_time TIMESTAMP DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET utf8;
