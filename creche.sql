-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tempo de Geração: 28/10/2024 às 18h34min
-- Versão do Servidor: 5.5.20
-- Versão do PHP: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Banco de Dados: `creche`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `aluno`
--

CREATE TABLE IF NOT EXISTS `aluno` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codresponsavel` int(5) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `endereco` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codresponsavel` (`codresponsavel`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Extraindo dados da tabela `aluno`
--

INSERT INTO `aluno` (`codigo`, `codresponsavel`, `nome`, `datanascimento`, `sexo`, `endereco`, `foto`, `status`) VALUES
(1, 1, 'pietro', '2014-09-01', 'masculino', 'ali mesmo ', '.', 0),
(2, 1, 'pietro', '2014-09-01', 'masculino', 'ali mesmo ', '.', 0),
(3, 2, 'aba', '2020-01-10', 'feminino', 'la', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARsAAAEbCAYAAADqLSAhAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw', 1),
(4, 2, 'a', '2000-01-01', 'a', 'a', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAAAJ6CAYAAADD8BnRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw', 1),
(5, 1, 'a', '2000-01-01', 'q', 'q', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAAAJ6CAYAAADD8BnRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw', 1),
(6, 3, 'b', '2000-01-02', 'a', 'a', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABVYAAAJ6CAYAAADD8BnRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjw', 1),
(7, 3, 'b', '2000-01-02', 'a', 'a', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBAQEBAVEBAVECAbEBUVGRsQEA4WIB0iIiAdH', 1),
(8, 3, 'b', '2000-01-02', 'a', 'a', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBAQEBAVEBAVECAbEBUVGRsQEA4WIB0iIiAdH', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `alunoturma`
--

CREATE TABLE IF NOT EXISTS `alunoturma` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codaluno` (`codaluno`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividades`
--

CREATE TABLE IF NOT EXISTS `atividades` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `auxiliar`
--

CREATE TABLE IF NOT EXISTS `auxiliar` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` int(14) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `auxiliar`
--

INSERT INTO `auxiliar` (`codigo`, `nome`, `cpf`, `datanascimento`, `sexo`, `email`, `endereco`, `telefone`, `status`) VALUES
(1, 'a', 123213123, '2014-09-01', 'masculino', 'alex@gmail.com', 'aqui ', '1111122222', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `avisos`
--

CREATE TABLE IF NOT EXISTS `avisos` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `calendario`
--

CREATE TABLE IF NOT EXISTS `calendario` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `chamada`
--

CREATE TABLE IF NOT EXISTS `chamada` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `codaluno` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `presenca` varchar(50) NOT NULL,
  `observacao` text NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`),
  KEY `codaluno` (`codaluno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `colaborador`
--

CREATE TABLE IF NOT EXISTS `colaborador` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` int(14) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Extraindo dados da tabela `colaborador`
--

INSERT INTO `colaborador` (`codigo`, `nome`, `cpf`, `datanascimento`, `sexo`, `email`, `endereco`, `telefone`, `login`, `senha`, `status`) VALUES
(1, 'paulo', 123098456, '2001-07-10', 'masculino', 'paulo@gmail.com', 'la', '1234567', '1234', '123', 0),
(2, 'oscar', 24544241, '1989-09-01', 'masculino', 'oscar@gmail.com', 'aqui e ali', '3211233', 'a', '123123', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `fotos`
--

CREATE TABLE IF NOT EXISTS `fotos` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `descricao` text NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `horario`
--

CREATE TABLE IF NOT EXISTS `horario` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `informacoesadicionais`
--

CREATE TABLE IF NOT EXISTS `informacoesadicionais` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codaluno` int(5) NOT NULL,
  `alergia` varchar(50) NOT NULL,
  `restricaoalimentar` varchar(50) NOT NULL,
  `doenca` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codaluno` (`codaluno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `listademateriais`
--

CREATE TABLE IF NOT EXISTS `listademateriais` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `foto` varchar(100) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `meudiamanha`
--

CREATE TABLE IF NOT EXISTS `meudiamanha` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `recado` text NOT NULL,
  `xixi` varchar(50) NOT NULL,
  `coco` varchar(50) NOT NULL,
  `sono` varchar(50) NOT NULL,
  `saude` varchar(50) NOT NULL,
  `medicacao` varchar(100) NOT NULL,
  `cafemanha` varchar(50) NOT NULL,
  `almoco` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codaluno` (`codaluno`),
  KEY `codturma` (`codturma`),
  KEY `codprofessor` (`codprofessor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Extraindo dados da tabela `meudiamanha`
--

INSERT INTO `meudiamanha` (`codigo`, `codaluno`, `codturma`, `codprofessor`, `datahora`, `recado`, `xixi`, `coco`, `sono`, `saude`, `medicacao`, `cafemanha`, `almoco`) VALUES
(2, 1, 2, 1, '2024-09-02 15:24:00', 'a', 'sim', 'sim', 'nao', 'bem', 'nenhum', 'bolacha da vaquinha', 'risoto'),
(3, 1, 2, 1, '2024-10-02 18:25:04', 'F', 'D', 'F', 'D', 'C', 'F', 'V', 'V'),
(4, 1, 2, 1, '2024-10-02 18:25:04', 'F', 'D', 'F', 'D', 'C', 'F', 'V', 'V'),
(5, 1, 2, 1, '2024-10-02 18:28:15', 'T', 'T', 'T', 'F', 'V', 'G', 'G', 'F'),
(6, 1, 2, 1, '2024-10-02 18:28:15', 'T', 'T', 'T', 'F', 'V', 'G', 'G', 'F'),
(9, 1, 2, 1, '2024-10-02 18:28:15', 'T', 'T', 'T', 'F', 'V', 'G', 'G', 'F');

-- --------------------------------------------------------

--
-- Estrutura da tabela `meudiatarde`
--

CREATE TABLE IF NOT EXISTS `meudiatarde` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codaluno` int(5) NOT NULL,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `datahora` datetime NOT NULL,
  `recado` text NOT NULL,
  `xixi` varchar(50) NOT NULL,
  `coco` varchar(50) NOT NULL,
  `sono` varchar(50) NOT NULL,
  `saude` varchar(50) NOT NULL,
  `medicacao` varchar(100) NOT NULL,
  `cafetarde` varchar(50) NOT NULL,
  `janta` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codaluno` (`codaluno`),
  KEY `codturma` (`codturma`),
  KEY `codprofessor` (`codprofessor`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Extraindo dados da tabela `meudiatarde`
--

INSERT INTO `meudiatarde` (`codigo`, `codaluno`, `codturma`, `codprofessor`, `datahora`, `recado`, `xixi`, `coco`, `sono`, `saude`, `medicacao`, `cafetarde`, `janta`) VALUES
(1, 1, 2, 1, '2024-09-02 15:24:00', 'a', 'sim', 'sim', 'nao', 'bem', 'nenhum', 'isso aqui', 'aquilo la');

-- --------------------------------------------------------

--
-- Estrutura da tabela `professor`
--

CREATE TABLE IF NOT EXISTS `professor` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` int(14) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

--
-- Extraindo dados da tabela `professor`
--

INSERT INTO `professor` (`codigo`, `nome`, `cpf`, `datanascimento`, `sexo`, `email`, `endereco`, `telefone`, `login`, `senha`, `status`) VALUES
(1, 'bilon', 12712498, '2014-09-01', 'masculino', 'bilon@gmail.com', 'logo ali', '993859323', '123', '123', 0),
(2, 'alex', 96127124, '1996-06-10', 'masculino', 'alex@gmail.com', 'aqui ', '1223334444', 'a', '1231', 1),
(4, 'micha', 19842841, '1980-05-12', 'masculino', 'micha@gmail.com', 'por ali', '(48)99803-3752', 'a', '321123', 1),
(5, 'a', 12, '2000-09-09', 'a', 'a', 'a', '123324', 'a', 'a', 1),
(6, 'a', 1233, '2000-10-10', 'a', 'a', 'a', '111111', 'a', 'a', 1),
(7, 'A', 124357, '2002-10-10', 'A', 'A', 'A', '111111', 'a', 'a', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `professorturma`
--

CREATE TABLE IF NOT EXISTS `professorturma` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `codturma` int(5) NOT NULL,
  `codprofessor` int(5) NOT NULL,
  `codauxiliar` int(5) NOT NULL,
  `periodo` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`),
  KEY `codturma` (`codturma`),
  KEY `codprofessor` (`codprofessor`),
  KEY `codauxiliar` (`codauxiliar`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estrutura da tabela `responsavel`
--

CREATE TABLE IF NOT EXISTS `responsavel` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `cpf` int(14) NOT NULL,
  `datanascimento` date NOT NULL,
  `sexo` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `login` varchar(50) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `nomeautorizado1` varchar(50) NOT NULL,
  `telefoneautorizado1` varchar(20) NOT NULL,
  `nomeautorizado2` varchar(50) NOT NULL,
  `telefoneautorizado2` varchar(20) NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `responsavel`
--

INSERT INTO `responsavel` (`codigo`, `nome`, `cpf`, `datanascimento`, `sexo`, `email`, `endereco`, `telefone`, `login`, `senha`, `nomeautorizado1`, `telefoneautorizado1`, `nomeautorizado2`, `telefoneautorizado2`, `status`) VALUES
(1, 'mi', 123301927, '0000-00-00', 'feminino', 'mi@gmail.com', 'meleiro', '554', 'mi', '1234', 'mi1', '123', 'mi2', '123', 1),
(2, 'alex', 96127124, '1996-06-10', 'masculino', 'alex@gmail.com', 'aqui ', '1223334444', 'a', '1231', 'a', '1231', 'a', '1231', 1),
(3, 'oscar', 24544241, '1989-09-01', 'masculino', 'oscar@gmail.com', 'aqui e ali', '3211233', 'a', '123', 'aa', '321123', 'aaa', '321123', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `turma`
--

CREATE TABLE IF NOT EXISTS `turma` (
  `codigo` int(5) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sala` varchar(50) NOT NULL,
  PRIMARY KEY (`codigo`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Extraindo dados da tabela `turma`
--

INSERT INTO `turma` (`codigo`, `nome`, `sala`) VALUES
(2, 'berçário I', '20'),
(3, 'Berçário', '2');

--
-- Restrições para as tabelas dumpadas
--

--
-- Restrições para a tabela `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`codresponsavel`) REFERENCES `responsavel` (`codigo`);

--
-- Restrições para a tabela `alunoturma`
--
ALTER TABLE `alunoturma`
  ADD CONSTRAINT `alunoturma_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `alunoturma_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `atividades`
--
ALTER TABLE `atividades`
  ADD CONSTRAINT `atividades_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `avisos`
--
ALTER TABLE `avisos`
  ADD CONSTRAINT `avisos_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `chamada`
--
ALTER TABLE `chamada`
  ADD CONSTRAINT `chamada_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `chamada_ibfk_2` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`);

--
-- Restrições para a tabela `fotos`
--
ALTER TABLE `fotos`
  ADD CONSTRAINT `fotos_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `informacoesadicionais`
--
ALTER TABLE `informacoesadicionais`
  ADD CONSTRAINT `informacoesadicionais_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`);

--
-- Restrições para a tabela `listademateriais`
--
ALTER TABLE `listademateriais`
  ADD CONSTRAINT `listademateriais_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`);

--
-- Restrições para a tabela `meudiamanha`
--
ALTER TABLE `meudiamanha`
  ADD CONSTRAINT `meudiamanha_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `meudiamanha_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `meudiamanha_ibfk_3` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`);

--
-- Restrições para a tabela `meudiatarde`
--
ALTER TABLE `meudiatarde`
  ADD CONSTRAINT `meudiatarde_ibfk_1` FOREIGN KEY (`codaluno`) REFERENCES `aluno` (`codigo`),
  ADD CONSTRAINT `meudiatarde_ibfk_2` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `meudiatarde_ibfk_3` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`);

--
-- Restrições para a tabela `professorturma`
--
ALTER TABLE `professorturma`
  ADD CONSTRAINT `professorturma_ibfk_1` FOREIGN KEY (`codturma`) REFERENCES `turma` (`codigo`),
  ADD CONSTRAINT `professorturma_ibfk_2` FOREIGN KEY (`codprofessor`) REFERENCES `professor` (`codigo`),
  ADD CONSTRAINT `professorturma_ibfk_3` FOREIGN KEY (`codauxiliar`) REFERENCES `auxiliar` (`codigo`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
