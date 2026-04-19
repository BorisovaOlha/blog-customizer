import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, contentWidthArr, backgroundColors, OptionType, ArticleStateType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';


type ArticleFormProps = {
	changeStyles: (styles: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const [isOpen, setOpen] = useState(false);

	const handleFormClick = () => {
		setOpen((isOpen) => !isOpen);
	};

	const onClose = () => {
		setOpen(false);
	};

	const modalRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (modalRef && !modalRef.current?.contains(e.target)) {
				onClose();
			}
		};
	}, []);

	const [selectedFont, setSelectedFont] = useState<OptionType>(defaultArticleState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);
	const handleFontSelect = (option: OptionType) => {
		setSelectedFont(option);
	};
	const handleFontSizeSelect = (option: OptionType) => {
		setSelectedFontSize(option);
	};
	const handleFontColorSelect = (option: OptionType) => {
		setSelectedFontColor(option);
	};
	const handleBackgroundColorSelect = (option: OptionType) => {
		setSelectedBackgroundColor(option);
	};
	const handleContentWidthSelect = (option: OptionType) => {
		setSelectedContentWidth(option);
	};

	// const formState = {
	// 	'--font-family': selectedFont?.value,
	// 	'--font-size': selectedFontSize?.value,
	// 	'--font-color': selectedFontColor?.value,
	// 	'--container-width': selectedBackgroundColor?.value,
	// 	'--bg-color': selectedContentWidth?.value,
	// };

	const formState = {
		fontFamilyOption: selectedFont,
		fontSizeOption: selectedFontSize,
		fontColor: selectedFontColor,
		contentWidth: selectedContentWidth,
		backgroundColor: selectedBackgroundColor,
	};


	const onStylesChange = (e: React.FormEvent) => {
		props.changeStyles(formState);
		e.preventDefault();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleFormClick} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })} ref={modalRef}>
				<form className={styles.form} onSubmit={onStylesChange}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						onChange={handleFontSelect}
						selected={selectedFont}
						title='шрифт'>
					</Select>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={handleFontSizeSelect}
						title='Размер шрифта'>
					</RadioGroup>
					<Select
						options={fontColors}
						onChange={handleFontColorSelect}
						selected={selectedFontColor}
						title='Цвет шрифта'>
					</Select>
					<Separator></Separator>
					<Select
						options={backgroundColors}
						onChange={handleBackgroundColorSelect}
						selected={selectedBackgroundColor}
						title='Цвет фона'>
					</Select>
					<Select
						options={contentWidthArr}
						onChange={handleContentWidthSelect}
						selected={selectedContentWidth}
						title='Ширина контента'>
					</Select>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
