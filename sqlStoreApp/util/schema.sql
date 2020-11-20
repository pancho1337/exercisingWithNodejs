Drop DATABASE sqlStoreApp ;

CREATE DATABASE sqlStoreApp ;

USE sqlStoreApp ;

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255)  NOT NULL,
  price DECIMAL(6,2) NOT NULL, 
  description TEXT NOT NULL,
  imageUrl varchar(255),
  PRIMARY KEY (ID)
  );

INSERT INTO products (title, price, description, imageUrl) values ( "A Red Book", 666.40, "Soy todo y no soy nada, un ser sin padre o madre...", "https://picsum.photos/200");