#!/bin/bash
mysql -uroot -Dmysql < ./base.sql
mysql -uroot -Dmysql < ./tables.sql
echo 'end sql'
