import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, contentWidthArr, backgroundColors, OptionType } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setOpen] = useState(false);

	const handleFormClick = () => {
		isOpen === false ? setOpen(true) : setOpen(false);
	};

	const [selectedFont, setSelectedFont] = useState<OptionType | null>(defaultArticleState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(defaultArticleState.fontColor);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType | null>(defaultArticleState.backgroundColor);
	const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType | null>(defaultArticleState.contentWidth);
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

	const formState = {
		'--font-family': selectedFont,
		'--font-size': selectedFontSize,
		'--font-color': selectedFontColor,
		'--container-width': selectedBackgroundColor,
		'--bg-color': selectedContentWidth,
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleFormClick} />
			<aside className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
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
