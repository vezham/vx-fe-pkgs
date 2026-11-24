// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import Folder from '@gravity-ui/icons/Folder'
import FolderFill from '@gravity-ui/icons/FolderFill'
import { useState } from 'react'

import { Stepper } from '@vezham/react-pro-v3'

function FolderStepIndicator() {
  const { status } = Stepper.useStep()

  return (
    <Stepper.Indicator>
      <Stepper.Icon>
        {status === 'complete' ? <FolderFill /> : <Folder />}
      </Stepper.Icon>
    </Stepper.Indicator>
  )
}

export function DynamicIcon() {
  const [step, setStep] = useState(1)

  return (
    <div className="w-[500px]">
      <Stepper currentStep={step} onStepChange={setStep}>
        {['Upload', 'Process', 'Complete'].map(title => (
          <Stepper.Step key={title}>
            <FolderStepIndicator />
            <Stepper.Content>
              <Stepper.Title>{title}</Stepper.Title>
            </Stepper.Content>
            <Stepper.Separator />
          </Stepper.Step>
        ))}
      </Stepper>
    </div>
  )
}
