import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	contentWidthArr,
	backgroundColors,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ArticleFormProps = {
	onApplyStyles: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleArrowBtnClick = () => {
		setIsFormOpen((isFormOpen) => !isFormOpen);
	};

	const handleCloseForm = () => {
		setIsFormOpen(false);
	};

	const modalRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isFormOpen) return;

		const handleOutsideClick = (e: MouseEvent) => {
			if (modalRef.current && !modalRef.current?.contains(e.target as Node)) {
				handleCloseForm();
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isFormOpen]);

	const [selectedStyles, setSelectedStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSelect = (key: keyof ArticleStateType, option: OptionType) => {
		setSelectedStyles((prevSelectedStyles) => {
			return { ...prevSelectedStyles, [key]: option };
		});
	};

	const handleApplyStyles = (e: React.FormEvent) => {
		e.preventDefault();
		props.onApplyStyles(selectedStyles);
	};

	const handleResetStyles = (e: React.FormEvent) => {
		e.preventDefault();
		setSelectedStyles(defaultArticleState);
		props.onApplyStyles(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleArrowBtnClick} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}
				ref={modalRef}>
				<form
					className={styles.form}
					onSubmit={handleApplyStyles}
					onReset={handleResetStyles}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						onChange={(option) => handleSelect('fontFamilyOption', option)}
						selected={selectedStyles.fontFamilyOption}
						title='шрифт'></Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedStyles.fontSizeOption}
						onChange={(option) => handleSelect('fontSizeOption', option)}
						title='Размер шрифта'></RadioGroup>
					<Select
						options={fontColors}
						onChange={(option) => handleSelect('fontColor', option)}
						selected={selectedStyles.fontColor}
						title='Цвет шрифта'></Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						onChange={(option) => handleSelect('backgroundColor', option)}
						selected={selectedStyles.backgroundColor}
						title='Цвет фона'></Select>
					<Select
						options={contentWidthArr}
						onChange={(option) => handleSelect('contentWidth', option)}
						selected={selectedStyles.contentWidth}
						title='Ширина контента'></Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
